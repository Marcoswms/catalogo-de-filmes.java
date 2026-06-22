package br.com.marcos.catalogo_filmes.service;

import br.com.marcos.catalogo_filmes.model.Filme;
import br.com.marcos.catalogo_filmes.repository.FilmeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmeService {

    private final FilmeRepository repository;

    public FilmeService(FilmeRepository repository) {
        this.repository = repository;
    }

    public List<Filme> listarTodos() {
        return repository.findAll();
    }

    public Filme salvar(Filme filme) {
        return repository.save(filme);
    }
}