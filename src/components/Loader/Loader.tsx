import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
  return (
    <div className="loader" data-testid="loader">
      <CircularProgress color="secondary" />
    </div>
  );
};
