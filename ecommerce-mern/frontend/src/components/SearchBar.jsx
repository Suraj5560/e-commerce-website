function SearchBar({ filters, setFilters, onSearch }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "20px 0",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Search product..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        style={inputStyle}
      />

      <button type="button" style={btnPrimary} onClick={onSearch}>
        Apply
      </button>

      <button
        type="button"
        style={btnSecondary}
        onClick={() => {
          setFilters({ search: "", minPrice: "", maxPrice: "" });
          onSearch();
        }}
      >
        Clear
      </button>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  width: "160px",
  background: "#fff",
};

const btnPrimary = {
  padding: "10px 16px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};

const btnSecondary = {
  padding: "10px 16px",
  background: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};

export default SearchBar;
