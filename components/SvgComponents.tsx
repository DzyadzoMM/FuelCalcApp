import Svg, { Circle, Line, Path, Polyline, Rect, SvgProps } from 'react-native-svg';


export function GaugeIcon({ size, active }: { size?: number; active?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={active ? "#F59E0B" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2a10 10 0 0 0-7.35 16.83" />
      <Path d="M12 2a10 10 0 0 1 7.35 16.83" />
      <Path d="M12 12l-4-4" />
      <Circle cx="12" cy="12" r="1.5" fill={active ? "#F59E0B" : "#6B7280"} stroke="none" />
    </Svg>
  );
}

export function ListIcon({ size, active }: { size?: number; active?: boolean } ) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={active ? "#F59E0B" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="5" width="18" height="4" rx="1" />
      <Rect x="3" y="11" width="18" height="4" rx="1" />
      <Rect x="3" y="17" width="18" height="4" rx="1" />
    </Svg>
  );
}

export function ChartIcon({ size, active }: { size?: number; active?: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={active ? "#F59E0B" : "#6B7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </Svg>
  );
}

export function CarIcon({ size }: { size?: number;}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <Path d="M5 17h14" />
      <Circle cx="7.5" cy="17" r="2" />
      <Circle cx="16.5" cy="17" r="2" />
      <Path d="M5 9l2-4h10l2 4" />
    </Svg>
  );
}


export function PlusIcon(props: SvgProps) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

export function ShareIcon(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="18" cy="5" r="3" />
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="19" r="3" />
      <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </Svg>
  );
}

export function SaveIcon(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <Polyline points="17 21 17 13 7 13 7 21" />
      <Polyline points="7 3 7 8 15 8" />
    </Svg>
  );
}

export function DropletIcon(props: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </Svg>
  );
}

export function TrashIcon(props: SvgProps) {
  return (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="3 6 5 6 21 6" />
      <Path d="M19 6l-1 14H6L5 6" />
      <Path d="M10 11v6M14 11v6" />
      <Path d="M9 6V4h6v2" />
    </Svg>
  );
}

export function EditIcon() {
  return (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Svg>
  );
}

export function MoonIcon({ active }: { active: boolean }) {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "#F59E0B" : "none"} stroke={active ? "#F59E0B" : "#6B7280"} strokeWidth="2" strokeLinecap="round">
      <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Svg>
  );
}

export function CloseIcon({ size, color }: { size?: number; color?: string}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
        fill={color}
      />
    </Svg>
  );
}
