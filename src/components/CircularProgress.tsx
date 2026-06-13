import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  labelSize?: number;
}

export const CircularProgress: React.FC<Props> = ({
  size = 44,
  strokeWidth = 3,
  progress,
  color = Colors.successRing,
  trackColor = Colors.progressTrack,
  showLabel = true,
  labelSize = 11,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (progress / 100);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
          rotation="-90"
          origin={`${cx},${cy}`}
        />
      </Svg>
      {showLabel && (
        <Text
          style={{
            fontSize: labelSize,
            fontWeight: '600',
            color: Colors.textPrimary,
          }}
        >
          {progress}%
        </Text>
      )}
    </View>
  );
};
