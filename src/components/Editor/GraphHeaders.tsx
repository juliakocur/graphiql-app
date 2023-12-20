import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch } from '../../redux/reduxHooks';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import trash from '/trash.png';

export const GraphHeaders = () => {
  interface Idata {
    key: string;
    value: string;
  }
  const { language } = useContext(LanguageContext);
  const [data, setData] = useState<Idata[]>([]);
  const { setHeaders } = graphSlice.actions;
  const dispatch = useAppDispatch();

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
    updateHeadersInStore(newData);
  };

  const updateHeadersInStore = (data: Idata[]) => {
    const headersValue = data.reduce(
      (acc: Record<string, string>, cur: Idata) => {
        if (cur.key) {
          acc[cur.key] = cur.value;
        }
        return acc;
      },
      {}
    );
    dispatch(setHeaders(headersValue));
  };

  const onBlurHandler = () => {
    updateHeadersInStore(data);
  };
  return (
    <div className="headers" onBlur={onBlurHandler}>
      {data.map((item, index) => {
        return (
          <div className="header-item" key={index}>
            <input
              className="input-key"
              data-testid={`input-key-${index}`}
              value={item.key}
              onChange={(e) => handleChangeKey(e, index)}
            ></input>
            :
            <input
              className="input-value"
              data-testid={`input-value-${index}`}
              value={item.value}
              onChange={(e) => handleChangeValue(e, index)}
            ></input>
            <div
              className="delete-button"
              onClick={() => handleDelete(index)}
              data-testid={`delete-btn-${index}`}
            >
              <Button variant="contained" size="small" type="submit">
                <img src={trash} alt="delete" className="trash" />
              </Button>
            </div>
          </div>
        );
      })}
      <div className="add-button" onClick={handleClick}>
        <Button variant="contained" size="small" type="submit">
          {Localization[language].newHeader}
        </Button>
      </div>
    </div>
  );
};
