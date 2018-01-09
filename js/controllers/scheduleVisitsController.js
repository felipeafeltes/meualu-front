(function () {
    'use strict';
    app.controller('ScheduleVisitsController', ScheduleVisitsController);
    app.controller('ScheduleVisitsCreateController', ScheduleVisitsCreateController);
    app.controller('ScheduledController', ScheduledController);

    function ScheduleVisitsController($scope, $uibModal, $state) {

        $scope.showSchedule = function (propertyId) {
            $scope.propertyId = propertyId;
            $state.go('scheduling', { id: 2 })
        }
    }

    function ScheduleVisitsCreateController($scope, propertyId, ScheduleVisit, $uibModalInstance) {
        $scope.scheduleVisit = new ScheduleVisit();
        $scope.scheduleVisit.property_id = propertyId;

        $scope.add = function () {
            $scope.scheduleVisit.$save(
                // success
                function (data) {
                    console.log(data);
                    $uibModalInstance.close();
                },
                // error
                function (error) {
                    _showValidationErrors($scope, error);
                }
            );
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };
    }

    function ScheduledController($scope, $rootScope) {
        $scope.visitas = [
            { url: 'data:image/jpeg;base64,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', id: '34JS6D4', day: 'Sexta (18/11)', hourInit: '08:00', hourFinish: '08:30', inquilino: 'Rafael', end: 'Rua Carlos, 222 - Case Verde', desc: 'Ponto' },
            { url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEBISFRUVFRUVFRcVFRUVFRUXFRUWFhUXFRUYHikgGBolGxYVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGislHx0tLS0tLS0tLS0tLS0tKystLSstLS0rLS0tLS0tLS0tLy0tLS0tKy0tLS0tLS0tLS0tLf/AABEIAKEBOAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwABBAUGBwj/xABEEAABAwMBBAcFBQUHAwUAAAABAAIRAxIhMQQTIkEFMlFhcYGxBkKRocEjUmLR8BQzgpLhBxY0Q3Ky8SRT4hUXosLS/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAlEQEAAgICAQQCAwEAAAAAAAAAARECEiExQQNRkfATYTKBoSL/2gAMAwEAAhEDEQA/AOuLUt1NZRoJZpleqJcJhi2oTTWWaaW6j2LUSlMYsKEhZBYUJC1aUxy1UWp5CAtWolmilIRkKoVRVqqEakIgIUhMtUtSyi4VQm2qrVbKKhSEy1S1LSi4VQmEKoVAQqhMhVCAIUhHCkIgIVQmQqhAEKI4UhAIVhSFIQS1S1RECooIVQmqWoEwqhOLUJaqhcKQjhVCAIURwog6SVIQq94AvG9aFim7VGsFRrFOU4WaSB1BQ1lW+V5S4LdsyW7Z1kb5XetXKVDCdQSzSWxKW4dy1GTMw15YqtWa5qW5i3GTNMdEERpoS1VBQqLVAjDlFLtQ2J+FcJZTGLVVqyi1AaatpRFqq1OLVUK2lFWqWpsK7Usom1Van2KjTSyibVUJxYqLUtKKhVCbaqtVsouFUJtqq1ELhRMhVagGVauFIRQwqLUUKQgG1RFCiqNsTKkKQrheV6EtUhEFYQLIQlqyIUtSymLCkrJNNAaatpRNyveIjTQmmtcIhcELiFDTVWFVAlCUZYqhaZLhSEcKQgGFAihXagGVEVqlqAFUI4UhVAQqtTIUtSwqFeU21S1LC7ipPcjtVFqihwpYFLVUKos01VivKu4oAsVWptymFLCbVVqfaqLFbKIhSE0sVWq2hUKJlqiWNhvFe9SYVrhTrZwqBXvAkSrlNV2PvRByxlcqamzIuCkhJBRApS2bhVaEMqwhaGmEJpJgIVwlyEGkhNFZFqq1XZKYxpKt2VlFqAhXZmid2puynShLlbC7CqLURlUqgbVUI1UKoCFIRQpCAYURQpCAVEUKWoAhVamWqoSwu1VCZCkK2hcKoTIUhLAK5VwpCCpVFFCqEAwoihRBl2KWJmVMrhbrRe7VWJkq5VsoqxS1NUSyirVLU6FdqbJRMK4TbVLU2WgBSUdqq1LFXK7lLFVicJyJVaqtVQUFlqEhEpKoWQqhNlUraFwqtWVT2V7stY4zzjHxT2dFVTyA8SPosz6mMdysYTPhrrVULcf+ikavHkFxlT2iLXuY6kDa5zZD+wkaEdyR6uM9Ss+nlDeW4J7I85IB+UnyVQtVS9pKejmVBroGnl4prenKB1c4eLXfRXaGdZbCFIWMzpOgdKrPMx6p7KzHdV7T4OBVtKEojtVQqBVI4VQgFVCOFUIBtVWo4VQlgbVVqOFEtC7VEaitlMm8q7+5YNDpWg7V7h/ASt9sezUXtD2EvHaZbkd2F5Z9TGHpj08pYEhMo0C/DQSuE9runnbNtVRu8e1u8saG5AgCcLq/7O9vfV34e8uLN1qAIuvOoHcplnUXC44XPLd0+inHUgfM/rzXM+0vSb9mrbpgYRaHS6ZyXCIBH3V3y8s/tFLjtfBdIpjq+Lj9Vj088ssqtrPGMYuh0/aapzYzyn81kM9psSaZ8h/5LlKoqb1rG3Rwh2J11kxhFSe41C3NoDj1cYHbC7VLnw7BvtKzmwjx/oCmt9oqPOfIE+oC4ijtLix7zHDEec65VnbCKbaht4iRieRP5Jrl0Xi7xnTlE+9HjA+qe3pOidKjf14LgjtJ3jaVolwnXtk9ncrbtEybernlnUBT/oqHoLdppnRwR71v3m/ELzv9oaAHFpzpgTgkdqc3aYcWAuBGTE6DwVuSoegDOkK7VwDekABdvXWzGS7XXmslvSTwYFWHaxwzH/Cm0msO1tUtXJ0umav/AHQR2yD6LLpdMVu1vwP1Tc0dBaqtWqp9Kv5x8h9E9vSLjyHr9Qn5E/G3dXpKrTYWU6YcWUBUb1nXEvtttHdPNNdV2kvcACGtrUwCGDipFsvkumc4kJDK20up/ZSBumlkBnX3hDhL5HVHPtWRV2XaHOMOcAK9Nw44G6AF7Yby1wV55mLd4iaLp7JtJc1z3uhteq48cXUSCKYIbh3u4K8s6QY/e7QQTl7rBd+MzAnC9SZ0Y4OYX1GktrVajQXOc4tcMNBdzHZyXle20SateCJc8xk44zM4wuvpzz992M44AGPuAzApy7Q8QBME/BDSNT7OQZe4gy0iACBpy1KM0HBwyYFPOTBdaeXMyhosqDdiTJJvy0wJET811+PtuZTdqdZcQOvZrClWpF8tHAbfX8lYfVsB4p3gAwerGoA9VW0VHAVJAID4y3rHiyZ1SoLMO1Fl0XiyJgka9kFZA6YqNn7WqIAJkkxOms9qw9oq5qhzQYtuzEyR2aK65H2kt91hdB5YgCVIj78Etm32hrD/ADQYAJuazE6cgshntNW5ikfJw9CtFtD2/aSHDDLtMDEQpWaw3ySMsnhJgDQd8q8lQ6VntQ73qQ8nx6hOb7UU/ep1B4Wn6hco6m2TxATVBM4gZ4fFRlPIl467yeInEYb49ybT7prDs2e0WznUvb4sP0lOHTGzkYqN8DLZ/mAXCtpvtGc2OJy3rZtHorcKgBgTAZymSYu0PJXaTWHodDaGP6j2u7bXAx4wmQuc9kWEVK08oAMRMeuSumhaiWJipBCiKFFbRxv7dQY8sfVptcMEF7QR4yV6B7KbXSfsw3dSm+0m617XWkkxdBxjtXiPSFcO2raCSCJeGyZGvu/BO6B6fZsbC2o2o4vIcLLSIiBOcZDl45w4eyM229tKtJ211Lxf9tUi2DBDgM5Xb/2WtbG1FoM7ym1x5GKYIjycvJy9j3VXlzAXOcQHAkiSTwkHv+SxqdUiQDGZxg9XuWpxuKZiam304QvJfb97ztrgy7qtGP8ASCPUrS9Ae1TNn2d9Ks+qXvLnNEOIgsa1pkmNWlaSrtVR75L3k8yXEzqBHZi0Qp6eOs2ZztFN65r98GNuiQMCRrmTGEOz1Hl7hm0NcdMY0zCEh++sF0XQeGRjXMIdnrPLniTaATpAMEAZjK7ePHTn5/tNm2yo6nUc6Ia5obIMGWzJz4oto2wimxzgw3TAIxqdJKKnXdu7i4ajy1Gf1zQbRtjmhhNpLpiZiLiBGVa568pfHbKNYiuG2tu+9AkYJxhJ2XaGuZUIpgAGDnLoc4dndKI7Qd8WcMwZPvaGU3Z6tPdVC5rTBbwjAdM6mNVK/Xst/sFSqy2nLDBm0An73PInKaHs3r+F19puPugGJgSmvdRijLdR29Ti54zlNAo7yrrIa4kz1gIkNHIp8/ZGuIpGiBxhtxzqSYHcsn7PfE3G6wi2DAEazCv7A0WEF4Y5xEcwZ0dLvwz8FkfslPf1YdL2scXfdtx1e05CTPffkj+mv3FPctbvBAeTcW6mNMlZVLZ2ivVqh7CXNADDHDEdbOiobFTNKkQ42uqG05lzpiDw4Cyhsf2laHQ4CHDWyYg6Z0TKe/vkiBsYeCHMHFL4nSSSG/JMqUaxpVAx8VCeAg6C4nnpiApT2IxTF3O7sNSJOk9/fol1ej2mjUaajBc6C5xEA3ExJdrmAucy1EO2p9HVn0OCq5odRptb9o9sPbVJe6W5EtgSE7a+i7nyazW/9XSrNBcSeACaYBOCTyGFrNp6JoPpv3m0U6d+z0Kbg62WW1nOY8y4daQ0aaanRZlTYNmNVzjXFztup1bQBiuyk1oonvIE9uVxdjNk2TZ2upxXoudv9ofTDbOJz5Lmthx4mjUjvwF5ntjBfXlzZLuejeI6mV6Ps+z7Hfs5bWeXDaNpfSEEB1RzX71juDRoLuzTmvNttYwmuC8iXcWMNhx+K6+lx9/bnnCm0Rc2HNgUwB2k2nI7pVU6Dvs4cMEl8OMROPFG1jLgbtKQAEZPDF2uAgoUWAUhewhpJnHFmeHOq639+XOlbupbzk1PvDDY7z2qto3gvLScPAZEHGZIhQbPwRcyd5JzoI0nt1wpWoON9pyXi3iOGyZ8OSXH6KVtDnjeRJDbYlpMknPih2io4b2WtMBhMt60xr2wmVqT5qFs6t3eR2iYnzRVm1BfaTgMs6uTi6PmkV9/pZI2mqBvbmgwKZdmJmIGNIV1qjftAWaOZdBOTGIzhOruqDeRJiy3EyTF3jCDaHPG84QYcyJYTcTrPbHySPv+JP3/AENRzZMtd+9aTBHWzAHchaGXN607x/LVxAkdwCKtUIJljT9q0aakzxeSjKnE0WCd69oyesAJd3+CBFGnTtEP/wAt4BtInWXdwCMsEGKg6rIkkdku7pVUqjCxsMwadQDiJhom7z1Ue5lrpa8CyloRhsi3zVHSexw+0rZB7MkwJxPYupXMeyLhva0AzzmPwgAeULqEiWZgKiuFFbSnhW1bWKlWq/EPc9zcARc8uGixfaKm5tSkHT+7aM8iNR4iYR0W7PuyHHjJ4THCBLdR4B/xCyf2ynLHB7XFol28DnAuucZGCYgt+C4W702OxNp7t5fYXZtufa4YwQOaX0fs7XucHAGGlwMkHAGkLFbttE9ZtHvhpH/1KzafSGygAS0QZAAwD/Kpc+zVR7tR0uy3aWMOIpsB5RJc4/7ls20hZTqNaReXExpDTyGumU+rt2yPNz7HHtc0E9+S1BtG30mkPoPph3ECCCAbxBghuME/FNp9jWPc9vSINSASGTklvd4Tqsxm2TP2jYgwJbkzj5LEHSGyxksk64kye+xZe09O7PUpspksaGNLWm0yRAEnGdFJzn2WMI90O1OsJuBdyBjz0MLNvMUzcHExdBPDPKZ7yuZ2h9ENaKbwSAby7hDs8NuOGBOJMwtm6rse7ZY+HtIc64iHEH3fwwQM8wpnlM+FxxiPLbMqAucLhGckETP/ACltqAtMuYMjhI17+9cxs9sEOcwEjGRrc3v7AU0uExcyMQbm5wO9IuJSeYdI9wmmLqJmOyGSeeMKMdLqoinjV0iamfdxlc1VdjhNOeUubHqi2B3EBVDNQZa7EDUEd/b3Le/DOjqN02xotZbOGzEEmMgaZRlouqOsF1puN3LBMCdUvoensxc6pUqtZu203tG8a41COItAkCeGOfWWTU6auFSqBTaWuptYwOaC5jg29wGkiXH5cs8vyTbppwxRTbZSG7dD3GwA5JmDMu0lOfQE1pY7SKpkEAHkBPcsT2ksq1KZDxAojiDrhNzzGOeQVzzNrrCA01LZ5OfAEDQAwMz8Su27lGEu0o043MNqcOaX8roz4XdijqbNw5rjVFMvBJj3pnAt7SuTJcQXFz7pECHTrl13mqLKjWFzalQ6cIa7hM8wcFLKeu1XbI5lT9ofWDtzszasA8LTVcaRbwmSXkg66ctVk1RsYqmTVvO3s5OgbUKItGnUsAPZ3rz7o7ad4Xm6puyWtO9tDzYA4TAgtDi4jWO5FtHTpoO3kvqBtVtWLus/qhxJBM2xy0XHnw6zER273YquxF2z7ttS419qNEm6BVAeK92dOvE47F5ztIpzXkuy7jPZxGIW59n/AGo3u10ANmaxrnOtPGbHVLryDMCbiTgnPw1m0Np/bi17oy+A6TEuhpnXwXTCZx/lwxlF9FhrLwZdO6AA/Db1jjXml0GU4ow4kAutlpl5nI0wiq1qYc11jwTR56NZEQ7OHZQU61Ju5gOgOIpwZyeKXHsXTZz1C6iwNAL4G9kkt5nRoQ16bCKvG0TUEyBw68JzrlG/dubBL+CtJ5S9sADTRTa6NK2rcSBe17yORJxGP1CTkarrUgTVhzRNsSYtE+92KtopTvLXNEhgbxRERJPYh2zZqZNaXubeWPd+EMyIx3I6zGHe8ZFzGOPCSGtbGdM6aJGX34JhVai7jtfqGWcRxEXeHNFWpP47TzZZnl72uiutsgcXtky8U4FpkRAHjMaJe0NYA6o4lrKrg0Esz9mBcQJy3iGcDIEqxP34JgdVtSXWnG8aG5b1M3FEwPnJP7xwHVwzEHuQVWA1HU5IeajcFpka8J7CjGz2GHOHFVccnJE9Ud+DhSwIa8x2WvkFpPbAxy7ucoHh0GWA8DCfszkyIEd3ZyhZDGaZHv4Djk5gd8fJLc2GyXDqgTcYmROfjlSymZ0b0gdnfUdaDJLTPBJwSZgzos7o32vFWo2m6kWXc7wQMT2Bct7QYYCJPG2Ik4tdmOxa2nXDIqkuHIYN2QRIAEwptMeGtYevh4OQovN9l9u3jhApZ0llXJ7NVFrePLOkudHsa4aVeRHVGh1596L+5LozW5W9UTAg6T3BdrTGc2WzrJkrLrkBvDyxnMj9dyVCXLzj+6BiN4cke4Mx596yKPsLLZdXDBJi5gAkxzu8F1dZzyeFrZ7sf0W66GmIqFp755+ED1KmUUuM24V/9nLi279obAAA4RHxuWoq+zD2v6/M5tx88L2LaGAsIcTBbHY3Pn6ritpoBrsEnyfzn8UfBTHlcuHH0vZwgwKo1B0B6uRzRVfZl0AGppMcMdYycz2ldcKRyJPlEpopY7fH9Fb1hjaXGO9mnTdvMmfdHMQcSr/uq+IFTGvV7BHauvFKPdHwj1Ct9I6w2P4j8gmsG0uQb7M1AQ7eDEe72CBiVQ9lakEbwaj3eyec967FrJ1az6+qIUwfu+QlNYNpcd/deqHN+0biPdPLtE5VN9l6sEb3mPdM4B0M9/ouz3IkS3zt/omtp+PwI+iawbS4key9aZ3rdI0MaROuvOe1UfZatpvh4w6TMd/cu3LdMH5ohTGY9U0N3EP9ma4JIqt4s4DhbmYGcdngoPZzaJ/et0j3s4ifFdo6gOwR4x6K/BpPgR9SFdDdxg9mtpEfatwZ97OmD8PmrZ7M7WcCs0Z1ueI1xppn5Lth/pPwCdQyeqddO1ScCM3Mt9gNucJG0UAD3v8A/wApn/t50hyr0NdZqAnAH3O75lejU9rpWwCRpOIz/FosqntLSID2nwcCR8CuM268PLKn9n/SQ/z6Pk+rp/JotHW6M2xpLTUEg6Xu+Gi9rq7Q2DpiZLiWj5gLz/brS8xoTIwtYxfaZTXTkDsG2aGoDg+87SNNETdl23AFUaffd8dF1Bp+ncht0x6LejG7nG0tuGlTsHXd58uas/t2ftOZ/wAx3ly5Lo20+448VDR/RlXQ3c3/ANcPf7PeJ9Vn9DnpI12bsOqmctYSXOboQPKcnC2ZZziR4ZTaL7TcJaR2EgjzjCaQby9D6M2GrRYPsqbuRNRm8ee4mcHktT03VqmoC1lNgawNY3dtc1pDrrgHggeAhaPZelarcCo8a8517ZStprl2SSXc8fkEjHlJy4OdsEO3gYLxBku6ztSTw8znmsfbBVc4Go2lh7nA82zoRMi4fDwSXyT1neHEpc7QEwewkT49q1qzs0m3bVtbX8DGECSCGsAuI43ATIkz8Vhv27anNLHUuEiI4dMGMHtC6J1NpILhkd5U3OdBPmppDW8tLT27ayf8Ox0EHNscOATLoOJT3bTtjiHHYaRIH3GHWfxZGncui6P2cF0EE9//AAs12wMnFx/jeP8Aa5WPSg/Lk4q3aA6/9g6wyAC1rHTi0A4OAezJEQouzbsbG4l/hvKh+AmVafhhI9bKCKTwXC0u+ZjzJkfFZm0VQAWvuE8xJn+KcJDXEHTHPX6R6pr33cxEc8n4E6aLFNRLW2tJAaX90F31K33RtBoaLr+erZGPxT4alaX9nqXYqMA5/Z/1W12dhsyC7sJpN+gTIxZ+1VwGG0NdiDc3BB1gyuQq1myYawDSGhzR/sC3+2VnMwGubIgy1gI7CGxlaV5pe8cyf+0PkGqYwZSQwASXNaB25n4wUe/kYmO0XfUKjs7dRcR3AfQInU287/Nv9V0qWbgZnW0+Bu/JC2o85Dfk/wDJHSbjhbp2k+hVgOOZ/lj1hKS1XPPWb8nfWPVJGDg/Fp+GSUyrTcNLj/G1v0lRgJHE04/G0/MhKLU1hJODI5AN/NOpsiRD/wD4hA2sYy10dzmn8ksV2DUO8ySlFswNjk74Srs7AQec8X1wsVu0U+13wj5ojWB5n4A+pVpLMJEgD/aT9UehwAfAAfHVKwci7yZPoE0H9EW+qUtng/rVFRPEBLhzw0k+qxmiDMjyITQ/P9JHzUlYdXs7HQId/Mw3fJyKyXSC9vjp5ST9VhbG7hBaWCR9x7fgbkZqxkVZdztaPVy4U7XAto2cTL6w54fZHge1cZ0i9lxDZgYkaeWSus2npABhG9IOkOe0nyDDK42oDJmD35z/ADFdMIlzzom5onOY5zKMBsRcfifVDvDMYHlKI1DzA+Bn1W2FkD9OKXPj5EI97OojxBVsII1aR5j0Eq9oqcYGO8N9IR6Z+h+iqPwjTtP1aoKgjkD4x6gK0lra6ND8vpCNxkdvmgZUb2/X80TgBy+R9Uost5OkQpkHQ/P80ZaCdB8RKjwOYd8BHxSi0E6h3iP+Srg9/hhKa0fiPiQmgT7pViC2TsQEy4z2D/grZNqj7pjuMLVbLQMiD+XmD+a2Ja6MwfAH+qsINhAEtBz3E+hCiCTGQB4Ng/FRVEcn0uqfH81FFxy6dce2to/4g/6nehW9r6M8PoVFFzjtvww+nv3Y/wBA9AuU23/Eu8R6BRRMeyWbS+iOroP1yCii6OcBp6MW1Z+vgootQSx9m6v8RSqv5+qpRWGZYLNU1mp8vVUos5dt49NkzQJW2ajw+oUUVlI7KqaNWKOsP1zVqLEtQyKmoWXQUUTHtMunY9D/ALpvl9U7aesfP0VKLhP8pd46cjtv7x3ifqsCr+XooovZHTyT21463ksw81aiYmQRofNYZUUUyXE6l1kW2fT81FFrHpme2r2/VvgtjS6rfBWorJDGfqpsfWUUVhDNvTaGjfEKKKT0uLdVdAsXZesookdHltn9XyUUUUhZf//Z', id: '34JS6D4', day: 'Sexta (18/11)', hourInit: '08:00', hourFinish: '08:30', inquilino: 'Rafael', end: 'Rua Carlos, 222 - Case Verde', desc: 'Ponto' },
            { url: 'data:image/jpeg;base64,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', id: '34JS6D4', day: 'Sexta (18/11)', hourInit: '08:00', hourFinish: '08:30', inquilino: 'Rafael', end: 'Rua Carlos, 222 - Case Verde', desc: 'Ponto' }
        ]

        $scope.cancelReason;
        $scope.otherReason;

        $scope.send = function () {

            if ($scope.cancelReason === 'other') {
                $scope.cancelReason = $scope.otherReason;
            }

            alert($scope.cancelReason);

        }


        $scope.openReasons = function () {
            $('#cancelScheduled').modal('show');
        }

    }

    function _showValidationErrors($scope, error) {
        $scope.validationErrors = [];
        if (error.status === 401 && error.data && angular.isObject(error.data)) {
            var errors = [];
            errors = error.data['errors'];
            for (i = 0; i < errors.length; i++) {
                $scope.validationErrors.push(errors[i]);
            }
        } else {
            $scope.validationErrors.push('Não foi possível completar o login do usuário');
        };
    }
})()
