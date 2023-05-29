import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { plugin1Plugin, Plugin1Page } from '../src/plugin';

createDevApp()
  .registerPlugin(plugin1Plugin)
  .addPage({
    element: <Plugin1Page />,
    title: 'Root Page',
    path: '/plugin1'
  })
  .render();
