import React from 'react';
import { methods } from '../../data/methods';
import PageHeader from '../layout/PageHeader';

export default function MethodsHeader() {
  return (
    <PageHeader
      title="Game Methods"
      subtitle="Discover Various Gaming Methods and Techniques"
      count={methods.length}
      countLabel="Methods"
    />
  );
}