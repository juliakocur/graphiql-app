import { schemaSlice } from '../../../redux/SchemaSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';

export const SchemaNavigation = ({
  typeClickHandler,
}: {
  typeClickHandler: (
    event: React.MouseEvent<HTMLAnchorElement>,
    addToHistory?: boolean
  ) => void;
}) => {
  const { removeFromHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.schemaReducer);
  const lastHistoryElement = history.at(-1);

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
