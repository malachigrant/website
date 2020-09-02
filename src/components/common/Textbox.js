/** @jsx jsx */
import { jsx } from '@emotion/core';

import Label from './Label';

export const Textbox = ({ label, required, onChange, value }) => {
  return (
    <div>
      {!!label && <Label required={required} value={label} />}
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Textbox;
