# Lojistik

## Qu'est-ce que Lojistik ?

Lojistik est un projet de webapp qui permet d'organiser et de stocker du contenu
pour le presse-papier. Afin d'éviter à l'utilisateur de devoir changer de page
constamment, on utilise la fonction de speech recognition du navigateur.  
Ainsi,l'utilisateur peut utiliser sa voix pour ajouter et copier du contenu dans
Lojistik.  
L'application ne stockant aucune données en dehors de l'appareil, elle est
conçue afin d'éviter tout problème de confidentialité.  
Il est donc possible d'importer/exporter ses données pour plusieurs supports
(fichier local, qr code, carte NFC).  
  
En cas de problème, me contacter par mail (lucastag77@gmail.com) ou sur discord
(Roucool_PvP#1231).
  
---
## Comment utiliser Lojistik ?
Afin d'utiliser Lojistik, il suffit de se renre sur le site
[Lojistik](https://craft-a-nig.ga/Lojistik). L'interface très simple permet à
n'importe quel utilisateur d'enregistrer ses sauvegardes de presse-papier. 

Logistik ne s'active que si vous prononcez son nom (avec un accent bien
français, comme "logistique"). Dès lors, il oubliera tout ce que vous avez dit
précédemment. Vous pouvez ensuite donner les instructions suivantes : ajoute(r),
copie(r).  

### Caractéristiques
Voici quelques caractéristiques de Logistik :
- Tous les textes lus sont en minuscules.
- La ponctuation n'est pas détectée
- Redire "Lojistik" ou "logistique" pendant une demande lui fera recommencer une
demande (et oublier la précédente).
- Lors de l'enregistrement, on sépare la valeur de la clé par le mot "pour".
- Lorsque la requête contient plusieurs "pour", le dernier est utilisé comme
séparateur.

### Exemples
Voici quelques exemples avec leur résultat :
- "Lojistik ajoute salut pour lol" : Ajoute une entrée "Salut" pour la clé "lol"
- "Lojistik ajoute amour pour tous pour amour" : Ajoute une entrée "Amour pour
tous" pour la clé "bonjour".
- "Lojistik copie lol" : Met "salut" dans le presse-papier.
- "Lojistik copie bonjour" : Met "Amour pour tous" dans le presse-papier.

### Précautions d'usage
Voici quelques recommandation pour utiliser Lojistik :
- Ne pas trop jouer avec les majuscules (une clé contenant une majuscule
pourrait ne pas être reconnue).
- Activer, sur windows, l'historique du presse-papier (pour éviter de perdre
involontairement des données précédemment copiées).

---
## Import/Export des données
Il est possible d'importer et d'exporter ses données. Pour cela, il faut
utiliser les boutons "Importer" et "Exporter" en bas de la page.

### Importer
L'importation propose 3 méthodes :
- Importer depuis un fichier local : Il suffit de sélectionner un fichier
au format `.ljs` contenant les données à importer.
- Importer depuis un QR Code : Il suffit de scanner un QR Code contenant les
données à importer.
- Importer depuis une carte NFC : Il suffit de placer une carte NFC contenant
les données à importer.

À l'avenir, il sera possible d'utiliser un deuxième appareil pour les deux
dernières méthodes.

### Exporter
L'exportation propose 3 méthodes :
- Exporter vers un fichier local : Il suffit de télécharger le fichier `.ljs`
contenant les données à exporter.
- Exporter vers un QR Code : Cela génère un QR Code contenant les données à
exporter. Il suffit de le scanner avec un appareil compatible.
- Exporter vers une carte NFC : Cela écrit les données à exporter sur une carte
NFC. Il suffit de la placer sur une carte NFC écrivable.

À l'avenir, il sera possible d'utiliser un deuxième appareil pour les deux
dernières méthodes.

---
## Autres documents
- [Changelog](docs/CHANGELOG.md)
- [Cahiier des charges](docs/CAHIER_DES_CHARGES.md)
- [Wireframes / Croquis](docs/wireframes/)