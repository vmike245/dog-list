import './DogCard.scss';

interface Props {
  imageUrl: string;
  name: string;
}

const DogCard: React.FC<Props> = ({ imageUrl, name }) => {
  return (
    <div className="rounded-corners elevation-1 overflow-hidden text-center">
      {!imageUrl ? (
        <p className="missing-image-message padding-2 text-center">
          It appears that we are missing an image for this breed
        </p>
      ) : (
        <img
          className="dog-image"
          alt={`${name}`}
          src={imageUrl}
          loading="lazy"
        ></img>
      )}
      <h3 className="text-center dog-name padding-2">{name}</h3>
    </div>
  );
};

export default DogCard;
