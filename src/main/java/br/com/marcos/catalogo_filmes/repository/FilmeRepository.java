package br.com.marcos.catalogo_filmes.repository;

import br.com.marcos.catalogo_filmes.model.Filme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmeRepository extends JpaRepository<Filme, Long> {
}
