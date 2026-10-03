import {
  CheckIcon, XIcon, MinusIcon, PlaceholderIcon, EyeIcon, CircleNotchIcon,
  TriangleIcon, SquareIcon, CircleIcon, MonitorIcon, DeviceMobileIcon, TelevisionSimpleIcon,
  PlayCircleIcon, WarningIcon, FileTextIcon, FileIcon, FolderSimpleIcon, CaretRightIcon,
  ArrowRightIcon, ArrowUpIcon, ArrowsCounterClockwiseIcon, ArrowCounterClockwiseIcon,
  PlayIcon, PauseIcon, CopyIcon, DownloadSimpleIcon, SunIcon, MoonIcon, CircleHalfIcon,
} from '@phosphor-icons/react'

// One icon family (Phosphor) at one weight across the interface. Icons are
// decorative here: every one sits next to a text label, so they are hidden
// from assistive technology. Brand artwork (leaf mark, registration marks,
// creatives) stays hand-drawn.
const wrap = (C, size = 16, weight = 'bold') => {
  const Icon = ({ size: s = size, weight: w = weight, ...rest }) => (
    <C size={s} weight={w} aria-hidden="true" focusable="false" {...rest} />
  )
  return Icon
}

export const I = {
  check: wrap(CheckIcon, 14),
  x: wrap(XIcon, 14),
  minus: wrap(MinusIcon, 14),
  placeholder: wrap(PlaceholderIcon, 14),
  eye: wrap(EyeIcon, 14),
  pending: wrap(CircleNotchIcon, 14),
  triangle: wrap(TriangleIcon, 12, 'fill'),
  square: wrap(SquareIcon, 12, 'fill'),
  circle: wrap(CircleIcon, 12),
  display: wrap(MonitorIcon, 15),
  social: wrap(DeviceMobileIcon, 15),
  dooh: wrap(TelevisionSimpleIcon, 15),
  animated: wrap(PlayCircleIcon, 15),
  warning: wrap(WarningIcon, 13),
  fileText: wrap(FileTextIcon, 15),
  file: wrap(FileIcon, 15),
  folder: wrap(FolderSimpleIcon, 17, 'fill'),
  caret: wrap(CaretRightIcon, 11),
  arrowRight: wrap(ArrowRightIcon, 32, 'regular'),
  arrowUp: wrap(ArrowUpIcon, 15),
  loop: wrap(ArrowsCounterClockwiseIcon, 20),
  replay: wrap(ArrowCounterClockwiseIcon, 15),
  play: wrap(PlayIcon, 14, 'fill'),
  pause: wrap(PauseIcon, 14, 'fill'),
  copy: wrap(CopyIcon, 16),
  download: wrap(DownloadSimpleIcon, 16),
  sun: wrap(SunIcon, 18),
  moon: wrap(MoonIcon, 18),
  system: wrap(CircleHalfIcon, 18),
}

export const PLATFORM_ICON = { Display: I.display, Social: I.social, DOOH: I.dooh, Animated: I.animated }
