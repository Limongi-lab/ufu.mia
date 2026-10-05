"""
Conteúdo inicial do site (copiado dos textos que já estavam no frontend).
Usado pelo comando `carregar_conteudo_inicial`. Não contém nenhum segredo.
"""

TEXTOS = [
    ('hero.selo', 'Início – topo', 'Selo pequeno acima do título', 'RESGATE E ADOÇÃO UFU'),
    ('hero.titulo', 'Início – topo', 'Título principal (Enter quebra a linha)', 'Dê uma patinha,\nSalve uma vida!'),
    ('hero.texto', 'Início – topo', 'Texto abaixo do título', 'Projeto de extensão da UFU que cuida da saúde e da alimentação dos gatos do Campus Santa Mônica, realiza castrações e promove a adoção responsável.'),
    ('hero.botao_adotar', 'Início – topo', 'Botão de adoção', 'Adote Agora'),
    ('hero.botao_doar', 'Início – topo', 'Botão de doação', 'Doe agora'),
    ('hero.foto_selo', 'Início – topo', 'Selo sobre a foto', 'UFU MIA · Universidade Federal de Uberlândia'),
    ('hero.foto_legenda', 'Início – topo', 'Legenda da foto', 'Gatinho recém resgatado pelo projeto'),
    ('sobre.selo', 'Sobre o projeto', 'Selo pequeno acima do título', 'SOBRE O PROJETO'),
    ('sobre.titulo', 'Sobre o projeto', 'Título', 'O que nos move a cuidar dos gatinhos da UFU'),
    ('sobre.texto', 'Sobre o projeto', 'Parágrafo de apresentação', 'O **UFU MIA** é um projeto de extensão da **Universidade Federal de Uberlândia (UFU)** que integra ensino, pesquisa e extensão para cuidar dos gatos abandonados no **Campus Santa Mônica**: oferecemos saúde, alimentação, castração e adoção responsável, e ainda contribuímos para a formação dos estudantes.'),
    ('pagina_sobre.titulo', 'Títulos das páginas', 'Página Sobre – título', 'Sobre o UFU MIA'),
    ('pagina_sobre.texto', 'Títulos das páginas', 'Página Sobre – texto', 'Projeto de extensão da UFU que integra ensino, pesquisa e extensão para cuidar dos gatos do Campus Santa Mônica.'),
    ('pagina_faq.titulo', 'Títulos das páginas', 'Página Perguntas Frequentes – título', 'Perguntas Frequentes'),
    ('pagina_faq.texto', 'Títulos das páginas', 'Página Perguntas Frequentes – texto', 'Respostas sobre o projeto, a adoção responsável e como participar.'),
    ('pagina_animais.selo', 'Títulos das páginas', 'Página Gatinhos – selo', 'UFU MIA • Adoção Responsável'),
    ('pagina_animais.titulo', 'Títulos das páginas', 'Página Gatinhos – título', 'Gatinhos para Adoção'),
    ('pagina_animais.texto', 'Títulos das páginas', 'Página Gatinhos – texto', 'Todos os gatos resgatados são levados ao veterinário para avaliação e cuidados. Conheça os gatinhos que esperam por um lar responsável.'),
    ('pagina_ps.selo', 'Títulos das páginas', 'Página Processo Seletivo – selo', 'Universidade Federal de Uberlândia'),
    ('pagina_ps.titulo', 'Títulos das páginas', 'Página Processo Seletivo – título', 'Processo Seletivo UFU MIA'),
    ('pagina_ps.texto', 'Títulos das páginas', 'Página Processo Seletivo – texto', 'Venha fazer parte da equipe do UFU MIA! Confira nosso edital oficial e preencha sua inscrição online.'),
    ('ccd.selo', 'Método CCD', 'Selo pequeno', 'COMO CUIDAMOS'),
    ('ccd.titulo', 'Método CCD', 'Título', 'A sigla CCD'),
    ('ccd.subtitulo', 'Método CCD', 'Subtítulo', 'Captura, Castração, Devolução ou Adoção.'),
    ('ccd.passo1_titulo', 'Método CCD', 'Passo 1 – título', 'Captura'),
    ('ccd.passo1_texto', 'Método CCD', 'Passo 1 – texto', 'Com paciência, resgatamos gatos mansos, ariscos e ferais. Todos são levados ao veterinário para avaliação e cuidados.'),
    ('ccd.passo2_titulo', 'Método CCD', 'Passo 2 – título', 'Castração'),
    ('ccd.passo2_texto', 'Método CCD', 'Passo 2 – texto', 'Fêmeas (a partir de 6 meses) e machos adultos são castrados. Benefícios: controle populacional e redução do risco de câncer.'),
    ('ccd.passo3_titulo', 'Método CCD', 'Passo 3 – título', 'Devolução ou Adoção'),
    ('ccd.passo3_texto', 'Método CCD', 'Passo 3 – texto', 'Gatos ariscos retornam ao campus, mas continuam monitorados e disponíveis para adoção. Gatos mansos e filhotes são divulgados para encontrar lares responsáveis.'),
    ('ccd.curiosidade_selo', 'Método CCD', 'Quadro de curiosidade – selo', 'Curiosidade · FIV e FeLV'),
    ('ccd.curiosidade_titulo', 'Método CCD', 'Quadro de curiosidade – título', 'Gatos FeLV+ também merecem um lar'),
    ('ccd.curiosidade_texto', 'Método CCD', 'Quadro de curiosidade – texto', 'A Leucemia Viral Felina (FeLV) afeta o sistema imunológico dos gatinhos, mas com os cuidados certos eles podem viver felizes e saudáveis por muitos anos. Gatos FeLV+ não transmitem a doença para humanos ou outros animais, como cães: a transmissão ocorre apenas entre gatos, principalmente por contato direto prolongado.'),
    ('frentes.selo', 'Frentes de atuação', 'Selo pequeno', 'Nossas Frentes de Trabalho'),
    ('frentes.titulo', 'Frentes de atuação', 'Título', 'Frentes de atuação do projeto'),
    ('frentes.subtitulo', 'Frentes de atuação', 'Subtítulo', 'Conheça as equipes que fazem o UFU MIA acontecer todos os dias.'),
    ('ajudar.selo', 'Como ajudar', 'Selo pequeno', 'FAÇA A DIFERENÇA'),
    ('ajudar.titulo', 'Como ajudar', 'Título', 'Como você pode nos ajudar'),
    ('ajudar.subtitulo', 'Como ajudar', 'Subtítulo', 'Você pode transformar a vida dos gatinhos da UFU de diversas formas. Seja adotando, acolhendo, entrando para a equipe ou ajudando financeiramente:'),
    ('faq.selo', 'Perguntas frequentes', 'Selo pequeno', 'TIRE SUAS DÚVIDAS'),
    ('faq.titulo', 'Perguntas frequentes', 'Título', 'Perguntas Frequentes'),
    ('faq.subtitulo', 'Perguntas frequentes', 'Subtítulo', 'Respostas sobre adoção responsável, processo seletivo e atuação do projeto UFU MIA.'),
    ('adotados.selo', 'Histórias de adoção', 'Selo pequeno', 'HISTÓRIAS DE ADOÇÃO'),
    ('adotados.titulo', 'Histórias de adoção', 'Título', 'Resgates que foram adotados'),
    ('fale.selo', 'Fale conosco', 'Selo pequeno', 'Fale Conosco'),
    ('fale.titulo', 'Fale conosco', 'Título', 'Manda um alô para a equipe'),
    ('fale.subtitulo', 'Fale conosco', 'Subtítulo', 'Escolha a pessoa certa para o assunto e fale direto pelo WhatsApp'),
    ('rodape.subtitulo', 'Rodapé', 'Frase abaixo do nome', 'Projeto de Extensão Universitária • UFU'),
    ('rodape.descricao', 'Rodapé', 'Descrição do projeto', 'Projeto de extensão da UFU que cuida da saúde e da alimentação dos gatos do Campus Santa Mônica, realiza castrações e promove a adoção responsável.'),
    ('rodape.email', 'Rodapé', 'E-mail de contato', 'ufumiaufu@gmail.com'),
    ('rodape.localizacao', 'Rodapé', 'Instituição e cidade', 'UFU - Universidade Federal de Uberlândia • Uberlândia - MG'),
    ('doacoes.titulo', 'Doações', 'Título da página', 'Doações'),
    ('doacoes.texto', 'Doações', 'Texto da página', 'Participe de nossos eventos, como bazares e rifas, ou contribua com doações pela chave PIX.'),
    ('doacoes.pix_selo', 'Doações', 'Selo do quadro do PIX', 'Chave PIX Oficial (E-mail)'),
    ('doacoes.pix_titulo', 'Doações', 'Título do quadro do PIX', 'Faça sua transferência via PIX'),
    ('doacoes.pix_instrucao', 'Doações', 'Instrução do PIX', 'Abra o app do seu banco, escolha a opção PIX e cole a chave abaixo:'),
    ('doacoes.chave_pix', 'Doações', 'CHAVE PIX (confira com cuidado ao editar!)', 'ufumiaufu@gmail.com'),
    ('doacao_home.selo', 'Doações', 'Faixa de doação (na Início) – selo', 'Ajude Nossos Resgates'),
    ('doacao_home.titulo', 'Doações', 'Faixa de doação (na Início) – título', 'Ajudar Financeiramente'),
    ('doacao_home.texto', 'Doações', 'Faixa de doação (na Início) – texto', 'Participe de nossos eventos, como bazares e rifas, ou com doações. Elas ajudam a cuidar da saúde e alimentar os gatos e a realizar castrações para o controle populacional.'),
    ('insta.titulo', 'Instagram', 'Faixa do Instagram – título', 'Nos siga no Instagram!'),
    ('insta.texto', 'Instagram', 'Faixa do Instagram – texto', 'E fique por dentro de todas as novidades: resgates emocionantes, histórias de adoção, dicas de cuidados com felinos, eventos, rifas e muito mais!'),
    ('ps.selo', 'Processo seletivo', 'Selo pequeno', 'PROCESSO SELETIVO'),
    ('ps.titulo_inicio', 'Processo seletivo', 'Título (parte comum)', 'Faça parte da equipe do'),
    ('ps.titulo_destaque', 'Processo seletivo', 'Título (parte colorida)', 'UFU MIA'),
    ('ps.texto', 'Processo seletivo', 'Texto de apresentação', 'Seja Extensionista ou Voluntário: faça parte da equipe e contribua com ações no projeto. Ajude nas atividades, nos eventos e no cuidado dos gatos.'),
    ('ps.edital_url', 'Processo seletivo', 'LINK do edital no Google Drive (https://...)', 'https://drive.google.com/file/d/1HYLdRj8LAJd9xM5WFcaj8PN2s-rDX-dA/view'),
    ('ps.edital_texto', 'Processo seletivo', 'Texto do quadro do edital', 'Confira todas as informações no edital oficial.'),
    ('ps.formulario_url', 'Processo seletivo', 'LINK do formulário de inscrição (https://...)', 'https://docs.google.com/forms/d/e/1FAIpQLSfZjbTEZx9EDUuPWmXjEAyJl8vGC9R28SgZQ5UnXJaBHpwNIQ/closedform'),
    ('ps.formulario_texto', 'Processo seletivo', 'Texto do quadro do formulário', 'Preencha o formulário oficial para se inscrever.'),
    ('ps.aviso', 'Processo seletivo', 'Aviso sobre prazos', 'Fique atento(a) aos prazos no edital. Durante o período aberto, o link abaixo levará diretamente ao formulário oficial de inscrição.'),
]

PONTOS_SOBRE = [
    ('A situação que nos fez começar', 'Mais de 50 gatos foram encontrados abandonados no Campus Santa Mônica, muitos deles doentes, presos em telhados e sem os cuidados adequados.'),
    ('Nossos objetivos', 'Cuidar da saúde e alimentar os gatos, realizar castrações para controle populacional, promover a adoção responsável dos animais e contribuir para o desenvolvimento acadêmico dos estudantes.'),
    ('Como agimos: o método CCD', 'Captura, Castração e Devolução ou Adoção. Gatos mansos e filhotes são divulgados para encontrar lares responsáveis; os ariscos voltam ao campus, mas seguem monitorados e disponíveis para adoção.'),
]

FRENTES = [
    ('Eventos', 'Organização de bazares, rifas, feirinhas, etc.', 'Falar com Eventos', '/fale-conosco'),
    ('Marketing', 'Divulgação nas redes sociais e campanhas.', 'Falar com Marketing', '/fale-conosco'),
    ('Artes', 'Criação de materiais visuais e design para divulgação.', 'Falar com Artes', '/fale-conosco'),
    ('Resgates', 'Equipe dedicada ao mapeamento e à captura dos gatos.', 'Falar com Resgates', '/fale-conosco'),
    ('Coordenação Interna', 'Gestão das equipes e organização do trabalho.', 'Falar com a Coordenação', '/fale-conosco'),
    ('Gente e Gestão', 'Apoio e logística para os voluntários e participantes do projeto.', 'Entrar para a equipe', '/processo-seletivo'),
]

FORMAS_DE_AJUDAR = [
    ('Adotar um Gatinho', 'Ofereça um lar amoroso e responsável para um dos gatinhos resgatados.', 'Ver Animais', '/animais'),
    ('Lar Temporário (LT)', 'Receba um gatinho em um local seguro, sem rotas de fuga, enquanto ele se recupera. Você dá carinho e atenção; nós damos medicamentos, caixinha de areia e ração.', 'Falar com a equipe', '/fale-conosco'),
    ('Ser Extensionista ou Voluntário', 'Faça parte da equipe e contribua com ações no projeto: ajude nas atividades, nos eventos e no cuidado dos gatos.', 'Ver Processo Seletivo', '/processo-seletivo'),
    ('Ajudar Financeiramente', 'Participe dos nossos eventos, como bazares e rifas, ou contribua com doações.', 'Fazer uma doação', '/doacoes'),
]

FAQ = [
    ('Como posso adotar um gatinho?', 'Gatos mansos e filhotes são divulgados para encontrar lares responsáveis. Veja os gatinhos disponíveis na aba **Animais** e fale com a equipe pelo Instagram **@ufu.mia**, pelo e-mail **ufumiaufu@gmail.com** ou pela aba **Fale Conosco**.'),
    ('Como funciona o Processo Seletivo do UFU MIA?', 'É o caminho para ser Extensionista ou Voluntário e fazer parte da equipe. Acesse a aba **Processo Seletivo**, leia o edital oficial e preencha o formulário de inscrição.'),
    ('O que significa a sigla CCD?', '**Captura:** resgatamos gatos mansos, ariscos e ferais, e todos são levados ao veterinário para avaliação e cuidados.\n\n**Castração:** fêmeas (a partir de 6 meses) e machos adultos são castrados.\n\n**Devolução ou Adoção:** gatos ariscos retornam ao campus, mas continuam monitorados e disponíveis para adoção. Gatos mansos e filhotes são divulgados para encontrar lares responsáveis.'),
    ('Com qual idade o gatinho já pode ser castrado?', 'As fêmeas são castradas a partir de **6 meses** e os machos adultos também passam pela cirurgia. Os benefícios são o controle populacional e a redução do risco de câncer.'),
    ('Como posso oferecer Lar Temporário (LT)?', 'Após o resgate, os gatinhos precisam de um local seguro para se recuperar e esperar pelo lar definitivo. O espaço precisa ser **sem rotas de fuga**, separado de outros bichinhos e com disponibilidade para oferecer carinho e atenção.\n\nOferecemos suporte completo e acompanhamento constante: medicamentos, caixinha de areia e areia, e ração. Fale com a equipe pela aba **Fale Conosco**.'),
    ('Gatos com FeLV podem passar a doença para pessoas?', 'Não. Gatos FeLV+ não transmitem a doença para humanos nem para outros animais, como cães. A transmissão ocorre apenas entre gatos, principalmente por contato direto prolongado. Com os cuidados certos, eles podem viver felizes e saudáveis por muitos anos.'),
    ('Por que o projeto existe?', 'Mais de 50 gatos foram encontrados abandonados no Campus Santa Mônica, muitos doentes, presos em telhados e sem cuidados adequados. O projeto cuida da saúde e alimenta os gatos, faz castrações para o controle populacional e promove a adoção responsável.'),
]

ESTATISTICAS = [
    (50, '+', '', 'Gatos abandonados no Campus Santa Mônica'),
    (6, '', '', 'Frentes de atuação: Eventos, Marketing, Artes, Resgates, Coordenação Interna e Gente e Gestão'),
    (3, '', '', 'Etapas do CCD: Captura, Castração e Devolução ou Adoção'),
]

CONTATOS = [
    ('Coordenação Interna', 'Quer falar com a Coordenação Interna?', [('Gabriela', '+55 16 99315-6561'), ('Leticia', '+55 16 99754-0285')]),
    ('Gestão de Pessoas', 'Quer ser Voluntário ou Extensionista?', [('Lucy', '+55 34 99660-3683')]),
    ('Resgates', 'Dúvidas sobre Resgates?', [('Ana Reis', '+55 34 99634-8547'), ('Lara', '+55 34 99877-3833')]),
    ('Marketing', 'Quer falar com nosso Marketing?', [('Sabrina', '+55 34 99105-9830')]),
    ('Artes', 'Quer falar com a equipe de Artes?', [('Luíza', '+55 34 99670-2802')]),
    ('Eventos', 'Dúvidas sobre nossos Eventos?', [('Ana Luiza', '+55 16 99720-0381')]),
    ('Financeiro', 'Quer falar com o Financeiro?', [('Júlia', '+55 34 99659-8855')]),
]

