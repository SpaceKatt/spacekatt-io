# Initial Design Intent

This population migration simulation is meant to model the movement of people among population centers - and to be a vessel for learning D3.js.

## Background

People often move among cities.

Migration patterns of humans may be analyzed through the application of a Markov chain.

Markovian processes may be represented by a fully connected graph who evolves through time.

Nodes represent population centers; edges represent the probability of a randomly chosen individual will transition between population centers (or remain put).

Discrete turns represent sampled points on a quantized frequency in this virtual world.

```yml
cities:
  - name: Boston
    pop: 8000
  - name: Seattle
    pop: 2000
edges:
  - tail: Seattle
    heads:
      - head: Boston
        flow: 0.5
      - head: Seattle
        flow: 0.5
  - tail: Boston
    heads:
      - head: Boston
        flow: 0.5
      - head: Seattle
        flow: 0.5
```

```code
0.5 -\           0.5           /- 0.5
\-> +--------+ <----- +---------+ <-/
    | Boston |   0.5  | Seattle |
    +--------+ -----> +---------|
```
