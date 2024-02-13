import ReactDOM from 'react-dom/client';

interface WelcomeProps {
  name: String;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Welcome name='Sarah' />);
