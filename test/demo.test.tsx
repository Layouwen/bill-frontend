import React from 'react';
import renderer from 'react-test-renderer';
import Button from '@/components/Button';

test('test Button', () => {
  const component = renderer.create(<Button>lyw</Button>);
  console.log(component);
});
