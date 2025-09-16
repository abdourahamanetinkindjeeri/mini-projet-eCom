# Rechercher sur les evenements

# Rechercher les conditions

# Pour gerer les like

const toggleLike = (id) => {
setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
};
