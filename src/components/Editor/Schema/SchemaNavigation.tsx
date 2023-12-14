import { schemaSlice } from '../../../redux/SchemaSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { TypeClickHandler } from './SchemaTypes';

export const SchemaNavigation = ({
  typeClickHandler,
}: {
  typeClickHandler: TypeClickHandler;
}) => {
  const { removeFromHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.schemaReducer);
  const lastHistoryElement = history.at(-2);

  return (
    <div>
      <a
        href={lastHistoryElement}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          typeClickHandler(event, false);
          dispatch(removeFromHistory());
        }}
      >
        {lastHistoryElement}
      </a>
    </div>
  );
};
