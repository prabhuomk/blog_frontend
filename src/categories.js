import { useHistory } from "react-router-dom";

export function Category({ setSearch }) {
  const history = useHistory();
  return (
    <div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th onClick={() => setSearch("")} scope="col">
              ALL CATEGORY
            </th>
            <th onClick={() => setSearch("Sports")} scope="col">
              SPORTS
            </th>
            <th onClick={() => setSearch("Music")} scope="col">
              MUSIC
            </th>
            <th onClick={() => setSearch("Movies")} scope="col">
              MOVIES
            </th>
            <th onClick={() => setSearch("Fashion")} scope="col">
              FASHION
            </th>
            <th onClick={() => setSearch("Tech")} scope="col">
              TECHNOLOGY
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
