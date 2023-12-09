import { Button } from '@mui/material';
import { useState } from 'react';

export const GraphHeaders = () => {
  interface Idata {
    key: string;
    value: string;
  }

  const [data, setData] = useState<Idata[]>([]);

  const handleChangeKey = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index].key = e.target.value;
    setData(newData);
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index].value = e.target.value;
    setData(newData);
  };

  const handleClick = () => {
    setData([...data, { key: '', value: '' }]);
  };

  const handleDelete = (item: number) => {
    const newData = [...data];
    newData.splice(item, 1);
    setData(newData);
  };
  return (
    <div className="headers">
      {data.map((item, index) => {
        return (
          <div className="header-item" key={index}>
            <input type="checkbox" />
            <input
              className="input-key"
              value={item.key}
              onChange={(e) => handleChangeKey(e, index)}
            ></input>
            <input
              className="input-value"
              value={item.value}
              onChange={(e) => handleChangeValue(e, index)}
            ></input>
            <div className="delete-button" onClick={() => handleDelete(index)}>
              <Button variant="contained" size="small" type="submit">
                DEL
              </Button>
            </div>
          </div>
        );
      })}
      <div className="add-button" onClick={handleClick}>
        <Button variant="contained" size="small" type="submit">
          + Add new Header
        </Button>
      </div>
    </div>
  );
};
