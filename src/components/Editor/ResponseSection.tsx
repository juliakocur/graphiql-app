import useGetResponseData, {
  IRequestParams,
} from '../../hooks/useGetResponseData';

export const ResponseSection = ({
  params,
}: {
  params: IRequestParams | null;
}) => {
  const data = useGetResponseData({
    params,
  });
  return (
    <div className="response">
      <div className="request-response-title">Response</div>
      <pre className="response-area">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
