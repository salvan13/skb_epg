function allPrograms(channels) {
  return channels.reduce((accumulator, channel) => {
    return accumulator.concat(channel.schedules);
  }, []);
}

export function getFirstProgramStartTime(channels) {
  return Math.min(...allPrograms(channels).map(p => p.start));
}

export function getLastProgramEndTime(channels) {
  return Math.max(...allPrograms(channels).map(p => p.end));
}

export function getActualProgram(now, schedules) {
  return schedules.find(program => program.start < now && program.end >= now);
}

export function convertDatesToNumbers(channels) {
  allPrograms(channels).forEach(p => {
    p.start = new Date(p.start).getTime();
    p.end = new Date(p.end).getTime();
  });
  return channels;
}
