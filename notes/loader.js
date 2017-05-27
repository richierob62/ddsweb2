yarn add react-loadable


import Loadable from 'react-loadable';

export default function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const LoadableAnotherComponent = Loadable({
  loader: () => import('./another-component'),
  LoadingComponent: MyLoadingComponent,
  delay: 300
});

class MyComponent extends React.Component {
  render() {
    return <LoadableAnotherComponent/>;
  }
}

...[3, 4] = 3, 4
