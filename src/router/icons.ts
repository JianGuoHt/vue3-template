import { getIconData } from '@iconify/utils';
import { icons } from '@iconify-json/ep';

export function getIcon(name: string | undefined) {
  const icon = name && getIconData(icons, name);
  return icon || '';
}
