import { useState, ChangeEvent, useContext } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const UrlInput = () => {
  const { setUrl } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { url } = useAppSelector((state) => state.graphReducer);
  const { language } = useContext(LanguageContext);
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
      placeholder={Localization[language].url}
      data-testid="input-http"
    ></input>
  );
};
