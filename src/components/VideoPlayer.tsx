import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { NativeModules, Platform, Pressable, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Colors } from '../constants/colors';
import { formatDuration } from '../utils/helpers';

let TPStreamsPlayerView: any = null;
try {
  if (NativeModules.TPStreams) {
    const tpLib = require('react-native-tpstreams');
    TPStreamsPlayerView = tpLib.TPStreamsPlayerView;
  }
} catch (e) {
  console.warn('Failed to load react-native-tpstreams:', e);
}

interface Props {
  uri?: string;
  videoId?: string;
  accessToken?: string;
  onTimeUpdate?: (seconds: number) => void;
}

export const VideoPlayer: React.FC<Props> = ({ uri = '', videoId, accessToken, onTimeUpdate }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(450);

  const hasNativePlayer = Platform.OS !== 'web' &&
    !!TPStreamsPlayerView && (
      !!UIManager.getViewManagerConfig('TPStreamsRNPlayerView') ||
      !!UIManager.getViewManagerConfig('RCTTPStreamsRNPlayerView')
    );

  const isDirectVideo = !!uri && (
    uri.includes('.m3u8') ||
    uri.includes('.mp4') ||
    uri.includes('.mov') ||
    uri.includes('.webm')
  );

  const isEmbed = !isDirectVideo && (
    uri.includes('tpstreams.com') || 
    (!!videoId && !!accessToken)
  );

  const player = useVideoPlayer(isEmbed ? null : uri, (p) => {
    p.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  useEffect(() => {
    if (isEmbed) return;
    const interval = setInterval(() => {
      if (player) {
        const time = player.currentTime ?? 0;
        setCurrentTime(time);
        setDuration(player.duration ?? 450);
        onTimeUpdate?.(time);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [player, onTimeUpdate, isEmbed]);

  if (hasNativePlayer && videoId && accessToken) {
    return (
      <View style={styles.container}>
        <TPStreamsPlayerView
          videoId={videoId}
          accessToken={accessToken}
          style={styles.tpPlayer}
        />
      </View>
    );
  }

  if (isEmbed) {
    const activeUri = (videoId && accessToken)
      ? `https://app.tpstreams.com/embed/87r52e/${videoId}/?access_token=${accessToken}`
      : uri;

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: activeUri }}
          style={styles.webview}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          backgroundColor="#1a1a2e"
        />
      </View>
    );
  }

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleSkipBack = () => {
    player.currentTime = Math.max(0, currentTime - 10);
  };

  const handleSkipForward = () => {
    player.currentTime = Math.min(duration, currentTime + 10);
  };

  const progressRatio = duration > 0 ? currentTime / duration : 0;

  return (
    <Pressable style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => { player.currentTime = 0; }} style={styles.controlBtn}>
            <Ionicons name="play-skip-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkipBack} style={styles.controlBtn}>
            <Ionicons name="play-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playBtn}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={26}
              color={Colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkipForward} style={styles.controlBtn}>
            <Ionicons name="play-forward" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { player.currentTime = duration; }} style={styles.controlBtn}>
            <Ionicons name="play-skip-forward" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
          </View>
          <Text style={styles.timeText}>
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    backgroundColor: '#1a1a2e',
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 10,
  },
  controlBtn: {
    padding: 6,
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    paddingHorizontal: 16,
    gap: 4,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  timeText: {
    color: Colors.white,
    fontSize: 11,
    textAlign: 'right',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  tpPlayer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
