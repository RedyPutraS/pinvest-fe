export const fillSpace = (n?: number) => {
  const modN = (n ?? 0) % 3;
  if (modN === 0) return;
  const times = 3 - modN;
  const el = [];
  for (let i = 0; i < times; i++) {
    el.push(<div className="hidden xl:block"></div>);
  }
  return el;
};
