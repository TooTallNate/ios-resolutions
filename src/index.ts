import { readFileSync } from 'fs';

export interface Device {
	familyModel: string;
	logicalWidth: number;
	logicalHeight: number;
	physicalWidth: number;
	physicalHeight: number;
	ppi: number;
	scaleFactor: number;
	screenDiagonal: string;
	release: string;
}

export interface Screen {
	width: number;
	height: number;
}

const dataFilePath = new URL('../data.json', import.meta.url);
export const devices: Device[] = JSON.parse(readFileSync(dataFilePath, 'utf8'));

export function guessDevice(
	screen: Screen,
	devicePixelRatio?: number
): Device | undefined {
	const device = devices.find((dev) => {
		return (
			screen.width === dev.logicalWidth &&
			screen.height === dev.logicalHeight &&
			(devicePixelRatio ? devicePixelRatio === dev.ppi : true)
		);
	});
	return device;
}
