-- migrate:up
CREATE TABLE fruits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    addedBy INT NOT NULL,

    CONSTRAINT fk_users
    FOREIGN KEY(addedBy) REFERENCES users(id)
);

-- migrate:down
DROP TABLE fruits;

