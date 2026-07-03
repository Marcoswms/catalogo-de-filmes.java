package br.com.marcos.catalogo_filmes.service;

import br.com.marcos.catalogo_filmes.model.Filme;
import br.com.marcos.catalogo_filmes.repository.FilmeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Filme> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Optional<Filme> atualizarPorId(Long id, Filme filmeAtualizado) {
        Optional<Filme> filmeOptional = repository.findById(id);
        if (filmeOptional.isEmpty()) {
            return Optional.empty();
        }
        Filme filme = filmeOptional.get();
        filme.setTitulo(filmeAtualizado.getTitulo());
        filme.setGenero(filmeAtualizado.getGenero());
        filme.setAnoLancamento(filmeAtualizado.getAnoLancamento());
        filme.setNota(filmeAtualizado.getNota());
        filme.setAssistido(filmeAtualizado.getAssistido());
        repository.save(filme);
        return Optional.of(filme);
    }

    public boolean deletarPorId(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}