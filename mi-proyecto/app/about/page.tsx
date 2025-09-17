export default function about(){
    return (
        <div>
            <p>Mi nombre es Guido Bailon, nací el 16 de enero de 2002. Tengo 23 años.</p>
            <p>Soy estudiante de la carrera de Ingeniería en Informática en la Universidad Nacional de Mar del Plata (UNMdP).</p>
            <table border={10}>
                <caption> Estas son las materias que estoy cursando actualmente</caption>
                <thead>
                    <tr>
                        <th scope="col">Materia</th>
                        <th scope="col">Profesor</th>
                        <th scope="col">Código</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Sistemas distribuidos</th>
                        <td>Hernán Hinojal</td>
                        <td>6B7</td>
                    </tr>
                    <tr>
                        <th scope="row">Redes de computadoras</th>
                        <td>Hernán Hinojal</td>
                        <td>6B8</td>
                    </tr>
                    <tr>
                        <th scope="row"> Bases de datos</th>
                        <td>Leticia Ceijas</td>
                        <td>6B6</td>
                    </tr>
                    <tr>
                        <th scope="row">Física experimental</th>
                        <td>Juan Pablo Espinosa</td>
                        <td>727</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}