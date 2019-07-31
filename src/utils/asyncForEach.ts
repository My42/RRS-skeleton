async function asyncForEach<T>(array : T[], cb : (T) => void) : Promise<void> {
    if (array.length === 0) return;
    await cb(array[0]);
    await asyncForEach(array.slice(1), cb);
}

export default asyncForEach;
