const getPx = (val: number) => `${val}px`;

export const generateScreens = (screenSizes: Record<string, number>) => {
  const screenEntries = Object.entries(screenSizes);

  const minWidthBreakpoints = screenEntries.reduce(
    (acc, [name, width]) => ({
      ...acc,
      [name]: { min: getPx(width) },
    }),
    {}
  );
  const maxWidthBreakpoints = screenEntries.reduce(
    (acc, [name, width]) => ({
      ...acc,
      [`to-${name}`]: { max: getPx(width) },
    }),
    {}
  );

  let prevBreakpointWidth: number;

  const onlyBreakpoints = screenEntries.reduce((acc, [name, width]) => {
    const isFirst = typeof prevBreakpointWidth === "undefined";

    const key = `${name}-only`;

    const value = isFirst
      ? { max: getPx(width) }
      : { min: getPx(width), max: getPx(prevBreakpointWidth - 1) };

    prevBreakpointWidth = width;

    return { ...acc, [key]: value };
  }, {});

  return { ...minWidthBreakpoints, ...maxWidthBreakpoints, ...onlyBreakpoints };
};
