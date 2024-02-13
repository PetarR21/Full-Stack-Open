interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>
      {props.courseParts.map((part: CoursePart) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
