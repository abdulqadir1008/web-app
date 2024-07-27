export const DirectionModule = (lat: string, lng: string) => {
  let latitude = lat;
  let longitude = lng;
  return (
    <a className="text-decoration-none normal-text text-dark p-0 m-0" target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}>
      Direction
    </a>
  );
};