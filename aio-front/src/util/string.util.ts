type ObjectKeyType = Record<string, unknown>;

export function trimStringsInObj<T extends ObjectKeyType>(obj: T): T {
	const newObj: ObjectKeyType = {};

	for (const key in obj) {
		if (typeof obj[key] === "string") {
			newObj[key] = (obj[key] as string).trim();
		} else if (typeof obj[key] === "object" && obj[key] !== null) {
			newObj[key] = trimStringsInObj(obj[key] as ObjectKeyType);
		} else {
			newObj[key] = obj[key];
		}
	}

	return newObj as T;
}
