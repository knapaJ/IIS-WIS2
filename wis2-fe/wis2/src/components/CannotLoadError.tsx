
type Props = {
  text:string
}

function CannotLoadError({text}: Props) {
  return (
    <div id="loadError">
      <h4>Chyba: nelze načíst {text}</h4>
	  </div>
  );
}

export default CannotLoadError;