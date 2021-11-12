build-program:
	cargo build-bpf --manifest-path=./program/Cargo.toml --bpf-out-dir=program/dist/

deploy:
	solana program deploy program/dist/solananames.so