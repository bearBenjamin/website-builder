import { Section } from "./Section"

const GRID_COLUMNS = {
  landing: 1,
  blog: 2,
  shop: 3,
};

function ListContent({ grid }) {
  const contents = Array.from(
    { length: GRID_COLUMNS[grid] },
    (_, index) => index + 1,
  );

  return contents.map((item) => <Section key={`${grid}-${item}`} tag={'div'} nameSection={'content'} placeholder={'Content'} idContent={item}/>)
}

export { ListContent };
