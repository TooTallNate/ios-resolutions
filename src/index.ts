import data from '../data.json';

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

export const devices: Device[] = data;

export function guessDevice(
	screen: Screen,
	devicePixelRatio = 1
): Device | undefined {
	const device = devices.find((dev) => {
		return (
			screen.width * devicePixelRatio === dev.physicalWidth &&
			screen.height * devicePixelRatio === dev.physicalHeight
		);
	});
	return device;
}
