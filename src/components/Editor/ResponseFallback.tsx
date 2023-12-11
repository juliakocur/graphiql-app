import { Loader } from '../Loader/Loader';

export const ResponseFallback = () => {
  return (
    <div className="response">
      <div className="request-response-title">Response</div>
      <Loader />
    </div>
  );
};
