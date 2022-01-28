import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import Button from '@/components/Button';
import { expect, vi } from 'vitest';

describe('Button', () => {
  test('children', () => {
    const component = renderer.create(<Button>按钮</Button>);
    const button = component.toJSON()! as ReactTestRendererJSON;
    expect(button.children).toEqual(['按钮']);
  });
  test('click', () => {
    const onClick = vi.fn();
    const button = renderer.create(<Button onClick={onClick}>按钮</Button>);
    const btnJSON = button.toJSON() as ReactTestRendererJSON;
    btnJSON.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });
});
