# 🧩 SudokuBreaker() - Risolutore Automatico di Sudoku

Una webapp moderna e accattivante per risolvere automaticamente i puzzle Sudoku con animazioni fluide e un'interfaccia utente intuitiva.

## ✨ Caratteristiche Principali

### 🎨 UI/UX Migliorata

- **Design moderno** con gradiente animato di sfondo
- **Interfaccia responsiva** che si adatta a tutti i dispositivi
- **Animazioni fluide** con Framer Motion
- **Effetti visivi accattivanti** (particelle, ombre, transizioni)
- **Splash screen** animato al caricamento

### 🚀 Animazioni Avanzate

- **Titolo interattivo** con lettere animate al hover
- **Celle animate** durante l'input e la risoluzione
- **Effetti di feedback** per input validi/non validi
- **Particelle animate** durante la risoluzione
- **Celebrazione finale** al completamento del puzzle

### 🧠 Algoritmo di Risoluzione

- **Backtracking ricorsivo** per risolvere qualsiasi Sudoku valido
- **Visualizzazione in tempo reale** del processo di risoluzione
- **Validazione in tempo reale** degli input dell'utente
- **Controllo errori** per configurazioni non valide

### 📱 Responsive Design

- **Adattivo** per desktop, tablet e smartphone
- **Touch-friendly** per dispositivi mobili
- **Viewport dinamico** con gestione della barra degli indirizzi mobile

## 🛠 Tecnologie Utilizzate

```json
{
  "react": "^18.2.0",
  "styled-components": "^6.0.8",
  "framer-motion": "^10.16.4"
}
```

## 📦 Installazione

### Pacchetti richiesti:

```bash
npm install styled-components framer-motion
```

### Avvio del progetto:

```bash
npm start
```

## 🎮 Come Utilizzare

1. **Inserimento numeri**: Clicca su una cella e inserisci un numero da 1 a 9
2. **Validazione automatica**: I numeri non validi saranno evidenziati in rosso
3. **Cancellazione**: Usa il tasto Backspace per cancellare una cella
4. **Risoluzione**: Clicca "🚀 Risolvi" per avviare l'algoritmo automatico
5. **Reset**: Clicca "🔄 Reset" per svuotare la griglia

## 🎨 Caratteristiche Tecniche

### Animazioni e Effetti

- **Framer Motion** per animazioni fluide e naturali
- **CSS Gradients** animati per sfondi dinamici
- **Transform animations** per feedback interattivo
- **Particle system** durante la risoluzione
- **Spring animations** per movimenti realistici

### Algoritmo di Risoluzione

```javascript
// Backtracking ricorsivo con visualizzazione
async function solveSudoku() {
  // Animazione visuale cella per cella
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      setCellBackground(row, col);
      setSudokuArr(updatedGrid);
      await sleep(75); // Pausa per animazione
    }
  }
}
```

### Validazione Input

- **Controllo regole Sudoku** (riga, colonna, sottoquadrato 3x3)
- **Feedback visivo immediato** per input non validi
- **Animazioni di errore** con shake effect

## 🎯 Funzionalità Future

- [ ] Generatore di puzzle casuali
- [ ] Livelli di difficoltà
- [ ] Timer e statistiche
- [ ] Modalità scura/chiara
- [ ] Salvataggio automatico
- [ ] Hints e suggerimenti
- [ ] Modalità multiplayer

## 🚀 Deploy

Il progetto è configurato per il deploy su GitHub Pages:

```bash
npm run build
npm run deploy
```

## 📱 Compatibilità

- ✅ Chrome (Desktop/Mobile)
- ✅ Firefox (Desktop/Mobile)
- ✅ Safari (Desktop/Mobile)
- ✅ Edge (Desktop/Mobile)

## 🎨 Personalizzazione

### Colori Principali

```css
/* Gradiente principale */
background: linear-gradient(-45deg, #26b567, #2e8b57, #20b2aa, #1e90ff);

/* Colori bottoni */
--solve-color: linear-gradient(45deg, #26b567, #20b2aa);
--reset-color: linear-gradient(45deg, #e74c3c, #c0392b);
--completion-color: linear-gradient(45deg, #ffd700, #ffa500);
```

### Tempistiche Animazioni

```javascript
// Velocità risoluzione (ms)
await sleep(75);

// Durata animazioni UI
transition={{ duration: 1.2, type: 'spring' }}
```

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 👨‍💻 Autore

**Simone Borin**

- GitHub: [@borinsimone](https://github.com/borinsimone)
- Progetto: [SudokuBreaker](https://borinsimone.github.io/sudokubreaker/)

---

⭐ Lascia una stella se ti è piaciuto il progetto!
