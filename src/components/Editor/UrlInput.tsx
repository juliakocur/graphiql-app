import { useState, ChangeEvent } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';

export const UrlInput = () => {
  const { setUrl } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { url } = useAppSelector((state) => state.graphReducer);

  const [urlValue, setUrlValue] = useState(url);

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };
  const onBlurHandler = () => {
    if (url !== urlValue) {
      dispatch(setUrl(urlValue));
    }
  };
  return (
    <input
      type="text"
      className="input-http"
      value={urlValue}
      onChange={handlerChange}
      onBlur={onBlurHandler}
      data-testid="input-http"
    ></input>
  );
};
