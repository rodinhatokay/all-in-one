interface OpeningHoursItem {
  day: string;
  hours: { start: string; end: string }[];
}

interface OpeningHours {
  day: string;
  hours: { start: string; end: string }[];
}

export const convertDataToOpeningHours = (
  data: OpeningHoursItem[]
): OpeningHours[] => {
  const openingHours: OpeningHours[] = [];

  data.forEach((item) => {
    const dayExists = openingHours.some((o) => o.day === item.day);

    if (!dayExists) {
      openingHours.push({ day: item.day, hours: [] });
    }

    const dayIndex = openingHours.findIndex((o) => o.day === item.day);
    const hoursIndex = openingHours[dayIndex].hours.length;

    openingHours[dayIndex].hours[hoursIndex] = {
      start: item.hours[0].start,
      end: item.hours[0].end,
    };
  });

  return openingHours;
};
