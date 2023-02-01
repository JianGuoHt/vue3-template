import { icons } from '@iconify-json/ep';
import { getIconData } from '@iconify/utils';

export function getIcon(name: string | undefined) {
  const icon = name && getIconData(icons, name);
  return icon || '';
}
