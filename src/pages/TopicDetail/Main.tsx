import { FC } from 'react';

const Main: FC = () => {
  return (
    <div className="flex-grow overflow-auto">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{ height: '400px', border: '1px solid red' }}>
          {i}
        </div>
      ))}
    </div>
  );
};

export default Main;
