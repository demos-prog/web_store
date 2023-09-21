import React from "react"
import './Categorie.css'

type Tcategorie = {
  setParamsUrl: (paramsUrl: string) => void,
  name: string,
  paramsUrl: string,
}

const Categorie: React.FC<Tcategorie> = ({ setParamsUrl, name, paramsUrl }) => {

  function handleClaick() {
    setParamsUrl(`/category/${name}`)
  }

  function makeNiceName(name: string): string {
    if (!name.includes("-")) return name[0].toUpperCase() + name.slice(1);
    const arr: string[] = name.split("-");
    arr[0] = arr[0][0].toUpperCase() + arr[0].slice(1);
    return arr.join(" ")
  }

  return (
    <div className="categorie"
      id={paramsUrl.slice(10) === name || (name === "All" && paramsUrl.length === 0) ? "is_selected" : ""}
      onClick={handleClaick}
    >
      <p>{makeNiceName(name)}</p>
    </div>
  )
}

export default Categorie

