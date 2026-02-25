import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';

@Component({
  selector: 'aims-pos-pos-dashboard',
  templateUrl: './pos-dashboard.component.html',
  styleUrls: ['./pos-dashboard.component.scss'],
})
export class PosDashboardComponent implements OnInit {
  dtpFromDate: any = '';
  dtpToDate: any = '';

  cmbCompany: any = '';
  cmbBusiness: any = '';
  cmbBranch: any = '';

  roleID: any = 0;
  lblTodaySaleTransaction: any = 0;
  lblTodaySaleAmount: any = 0;
  lblMonthlyExpense: any = 0;
  lblMonthlyIncome: any = 0;

  sale_chart: Chart | undefined;
  monthly_sale_chart: Chart | undefined;
  incomeExpense_chart: Chart | undefined;
  accountHead_pieChart: Chart | undefined;

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];

  topSaleList: any = [];
  underStockList: any = [];
  moduleId: string | null;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    public datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.dtpFromDate = new Date();
    this.dtpToDate = new Date();
    this.dtpFromDate.setMonth(this.dtpFromDate.getMonth() - 6);
    this.moduleId = localStorage.getItem('moduleId');

    this.roleID = this.globalService.getRoleId();
    this.globalService.setHeaderTitle('Dashboard');

    this.getCompany();
    if (this.roleID == 1 || this.roleID == 13) {
      this.getTodaySaleTransaction();
      this.getTodaySaleAmount();
      this.getTopSales();
      this.getUnderStock();

      this.dailySaleChart();
      this.monthlySaleChart();
      this.incomeExpenseChart();
      this.accountHeadPieChart();
    }
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
        if (
          this.globalService.getRoleId() != 1 ||
          this.globalService.getRoleId() != 13
        ) {
          this.getBusiness();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBusiness() {
    var companyID = 0;
    if (
      this.globalService.getRoleId() == 1 ||
      this.globalService.getRoleId() == 13
    ) {
      companyID = this.cmbCompany;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (
            this.globalService.getRoleId() != 1 &&
            this.globalService.getRoleId() != 13
          ) {
            this.cmbCompany = this.globalService.getCompanyID();
            this.cmbBusiness = this.globalService.getBusinessID();
            this.getBranch();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getBranch() {
    var businessID = 0;
    if (
      this.globalService.getRoleId() == 1 ||
      this.globalService.getRoleId() == 13
    ) {
      this.cmbBranch = '';
      businessID = this.cmbBusiness;
    } else {
      businessID = this.globalService.getBusinessID();
      if (this.cmbBusiness == '') {
        this.cmbBusiness = this.globalService.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
          if (
            this.globalService.getRoleId() != 1 &&
            this.globalService.getRoleId() != 13
          ) {
            this.cmbBranch = this.globalService.getBranchID();

            this.getTodaySaleTransaction();
            this.getTodaySaleAmount();
            this.getTopSales();
            this.getUnderStock();

            this.dailySaleChart();
            this.monthlySaleChart();
            this.incomeExpenseChart();
            this.accountHeadPieChart();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getTodaySaleTransaction() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getTodaySaleTransaction?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            if (response.length > 0) {
              this.lblTodaySaleTransaction = response[0].count;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  getTodaySaleAmount() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getTodaySaleAmount?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            if (response.length > 0) {
              this.lblTodaySaleAmount = response[0].totalsale;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  getTopSales() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getTopSales?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            this.topSaleList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  getUnderStock() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getUnderStock?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            this.underStockList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  dailySaleChart() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var firstDate = year + '-' + month + '-01';

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getDailySales?fromDate=' +
            firstDate +
            '&toDate=' +
            this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
            '&userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            var item: any = [],
              amount: any = [];

            for (var i = 0; i < response.length; i++) {
              item.push(response[i].fld_monthday);
              amount.push(response[i].fld_amount);
            }
            let chart = new Chart({
              title: {
                text: 'Chart of Daily Sale',
              },

              yAxis: {
                title: {
                  text: 'Amount',
                },
              },

              xAxis: {
                categories: item,
              },
              credits: {
                enabled: false,
              },
              plotOptions: {
                series: {
                  label: {
                    connectorAllowed: false,
                  },
                },
              },

              series: [
                {
                  name: 'Sales',
                  type: 'line',
                  // data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                  data: amount,
                },
              ],

              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 500,
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                      },
                    },
                  },
                ],
              },
            });
            this.sale_chart = chart;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  monthlySaleChart() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var firstDate = year + '-01-01';

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getMonthlySales?fromDate=' +
            firstDate +
            '&toDate=' +
            this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
            '&userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            var item: any = [],
              amount: any = [];

            for (var i = 0; i < response.length; i++) {
              item.push(response[i].fld_monthname);
              amount.push(response[i].fld_amount);
            }
            let chart = new Chart({
              title: {
                text: 'Chart of Monthly Sale',
              },

              yAxis: {
                title: {
                  text: 'Amount',
                },
              },

              xAxis: {
                // categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug']
                categories: item,
              },
              credits: {
                enabled: false,
              },
              plotOptions: {
                series: {
                  label: {
                    connectorAllowed: false,
                  },
                },
              },

              series: [
                {
                  name: 'Sales',
                  type: 'column',
                  // data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                  data: amount,
                },
              ],
            });
            this.monthly_sale_chart = chart;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  incomeExpenseChart() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    var date = new Date();
    var year = date.getFullYear();
    var firstDate = year + '-01-01';

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getMonthlyExpense?fromDate=' +
            firstDate +
            '&toDate=' +
            this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
            '&userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            var month: any = [],
              income: any = [],
              expense: any = [];

            for (var i = 0; i < response.length; i++) {
              const date = new Date();
              date.setMonth(response[i].monthno - 1);

              month.push(date.toLocaleString('en-US', { month: 'long' }));
              income.push(response[i].income);
              expense.push(response[i].expense);
            }

            let chart = new Chart({
              title: {
                text: 'Monthly Income & Expenses',
              },

              yAxis: {
                title: {
                  text: 'Amount',
                },
              },
              credits: {
                enabled: false,
              },

              xAxis: {
                categories: month,
              },

              plotOptions: {
                series: {
                  label: {
                    connectorAllowed: false,
                  },
                  pointStart: 0,
                },
              },

              series: [
                {
                  name: 'Income',
                  type: 'line',
                  // data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                  data: income,
                },
                {
                  name: 'Expense',
                  type: 'line',
                  // data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                  data: expense,
                },
              ],

              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 500,
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                      },
                    },
                  },
                ],
              },
            });
            this.incomeExpense_chart = chart;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  accountHeadPieChart() {
    if (this.cmbCompany == '') {
      this.cmbCompany = 0;
    }
    if (this.cmbBusiness == '') {
      this.cmbBusiness = 0;
    }
    if (this.cmbBranch == '') {
      this.cmbBranch = 0;
    }

    if (
      (this.cmbCompany == 0 && this.cmbBusiness == 0 && this.cmbBranch == 0) ||
      (this.cmbCompany > 0 && this.cmbBusiness > 0 && this.cmbBranch > 0)
    ) {
      this.dataService
        .getHttp(
          'core-api/PosDashboard/getCoaTypeSummary?fromDate=' +
            this.datepipe.transform(this.dtpFromDate, 'yyyy-MM-dd') +
            '&toDate=' +
            this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
            '&userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchid=' +
            this.cmbBranch +
            '&businessid=' +
            this.cmbBusiness +
            '&companyid=' +
            this.cmbCompany,
          ''
        )
        .subscribe(
          (response: any) => {
            if (response.length > 0) {
              this.lblMonthlyExpense = response[1].amount;
              this.lblMonthlyIncome = response[2].amount;
              var items: any = [];

              for (var i = 0; i < response.length; i++) {
                items.push([response[i].coatypename, response[i].amount]);
              }

              let chart = new Chart({
                chart: {
                  styledMode: false,
                },

                title: {
                  text: 'Account Head Utilization',
                },

                credits: {
                  enabled: false,
                },
                series: [
                  {
                    type: 'pie',
                    allowPointSelect: true,
                    keys: ['name', 'y', 'selected'],
                    data: items,
                    showInLegend: true,
                  },
                ],
              });
              this.accountHead_pieChart = chart;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  reset() {
    this.cmbCompany = '';
    this.cmbBusiness = '';
    this.cmbBranch = '';

    this.businessList = [];
    this.branchList = [];

    this.getTodaySaleTransaction();
    this.getTodaySaleAmount();
    this.getTopSales();
    this.getUnderStock();

    this.dailySaleChart();
    this.monthlySaleChart();
    this.incomeExpenseChart();
    this.accountHeadPieChart();
  }
}
