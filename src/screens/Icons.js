import React from 'react';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { colors } from '../styles/SharedStyles';

export const ICON_TYPES = { 
  REPORT: 'report',
  REVIEW: 'review',
  SETTINGS: 'settings',

  CHART: 'chart',
  MEDS: 'meds',
  POOP: 'poop',
  SLEEP: 'sleep',
  HEALTH: 'health',

  NEXT: 'next',
  BACK: 'back',
  WARN: 'warn'
}

export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 48,
}

export function TrackrIcon(props) {
  
  let size = props.size;
  if (!size) {
    size = ICON_SIZES.MEDIUM
  }
  let color = props.color;
  if (!color) {
    color = colors.primaryDark;
  }

  let name = 'font-awesome';
  let family = 'fa';

  switch (props.iconType) {
    case ICON_TYPES.REPORT:
      name = 'pencil';
      break;
    case ICON_TYPES.REVIEW:
      name = 'line-chart';
      break;
    case ICON_TYPES.SETTINGS:
      name = 'gear';
      break;
    case ICON_TYPES.CHART:
      name = 'bar-chart';
      break;
    case ICON_TYPES.MEDS:
      name = 'pills';
      family = 'fa5'
      break;
    case ICON_TYPES.POOP:
      name = 'poop';
      family = 'fa5'
      break;
    case ICON_TYPES.SLEEP:
      name = 'moon-o';
      break;
    case ICON_TYPES.HEALTH:
      name = 'battery';
      break;
    case ICON_TYPES.NEXT:
      name = 'angle-right';
      break;
    case ICON_TYPES.BACK:
      name = 'angle-left';
      break;
    case ICON_TYPES.WARN:
      name = 'warning';
      break;
  }
  if (family === 'fa') {
    return (
      <FontAwesome
        name={name} size={size} color={color} 
      />
    );
  } else if (family === 'fa5') {
    return (
      <FontAwesome5
        name={name} size={size} color={color} 
      />
    );
  }
}