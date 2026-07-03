package br.com.marcos.catalogo_filmes.controller;

import br.com.marcos.catalogo_filmes.model.Filme;
import br.com.marcos.catalogo_filmes.service.FilmeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/filmes")
public class FilmeController {

    private final FilmeService service;

    public FilmeController(FilmeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Filme> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Filme salvar(@RequestBody Filme filme) {
        return service.salvar(filme);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Long id) {
        Optional<Filme> filme = service.buscarPorId(id);

        if (filme.isPresent()) {
            return ResponseEntity.ok(filme.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizarPorId(@PathVariable Long id, @RequestBody Filme filme) {
        Optional<Filme> filmeAtualizado = service.atualizarPorId(id, filme);
        if (filmeAtualizado.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(filmeAtualizado.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPorId(@PathVariable Long id) {
        boolean removido = service.deletarPorId(id);
        if (removido) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}